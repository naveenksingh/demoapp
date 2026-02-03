
const functionUrl =
  process.env.ORDER_PROCESS_URL;

async function callOrderProcess(body) {
  try {
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.text();
    return data;
  } catch (err) {
    return err.message;
  }
}

module.exports = { callOrderProcess };