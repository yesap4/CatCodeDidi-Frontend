async function SendPrompt(prompt) {
  const response = await fetch("http://localhost:8000/Prompt", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Prompt: prompt }),
  });

  if (!response.ok) {
    throw new Error(`Server Status: ${response.status}`);
  }

  return response.json();
}

export default SendPrompt;
