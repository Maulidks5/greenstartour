const csrfToken = () => document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? "";

const cookieValue = (name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];

  return cookie ? decodeURIComponent(cookie) : "";
};

const sendRequest = (url: string, payload: Record<string, unknown>) =>
  {
    const xsrfToken = cookieValue("XSRF-TOKEN");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };

    if (xsrfToken) {
      headers["X-XSRF-TOKEN"] = xsrfToken;
    } else {
      headers["X-CSRF-TOKEN"] = csrfToken();
    }

    return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers,
    body: JSON.stringify(payload),
  });
  };

export const postPublicForm = async (url: string, payload: Record<string, unknown>) => {
  await fetch(window.location.href, {
    method: "GET",
    credentials: "same-origin",
    headers: { Accept: "text/html" },
  });

  const submitResponse = await sendRequest(url, payload);

  if (submitResponse.status === 419) {
    window.location.reload();
    throw new Error("Session expired. The page is refreshing, please try again.");
  }

  if (!submitResponse.ok) {
    const data = await submitResponse.json().catch(() => ({}));
    throw new Error(data.message || "Please check the form and try again.");
  }

  return submitResponse.json();
};
