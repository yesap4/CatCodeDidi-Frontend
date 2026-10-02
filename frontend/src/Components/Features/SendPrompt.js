async function SendPrompt(prompt) {
  const text = prompt.toLowerCase();

  let greeting = false;
  if (text.includes("hello")) {
    greeting = true;
  } else if (text.includes("hey")) {
    greeting = true;
  } else if (text.includes("hi")) {
    greeting = true;
  }

  let creator = false;
  if (text.includes("created")) {
    creator = true;
  } else if (text.includes("developer")) {
    creator = true;
  }

  if (greeting === true) {
    return "Hey there! How can I help?";
  } else if (creator === true) {
    return "I was created by the CatCodeDidi and The Leader Was Anant.";
  } else {
    const res = await fetch(
      "https://cat-code-didi-web-backend.vercel.app/Prompt",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Prompt: prompt }),
      }
    );

    if (res.ok === false) {
      throw new Error("Server Status: " + res.status);
    }

    const data = await res.json();
    return data;
  }
}

export default SendPrompt;