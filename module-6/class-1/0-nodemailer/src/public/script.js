
const createRecipientInput = () => {
  const input = document.createElement("input");
  input.type = "email";
  input.placeholder = "Recipient email";
  input.required = true;

  return input;
};

const addRecipientBtn = document.querySelector("button#add-recipient");
addRecipientBtn.addEventListener("click", () => {
  const parent = addRecipientBtn.parentNode;
  const recipientInput = createRecipientInput();
  parent.insertBefore(recipientInput, addRecipientBtn);
});


const form = document.querySelector("form");

const submitEmail = async (event) => {
  event.preventDefault();

  const recipientInputs = document.querySelectorAll("#recipients > input");
  // const recipients = [...recipientInputs].map(input => input.value);
  const recipients = Array.from(recipientInputs).map(input => input.value);

  const emailPayload = {
    from: {
      name: document.querySelector("input#sender-name").value,
      address: document.querySelector("input#sender-email").value,
    },
    to: recipients,
    subject: document.querySelector("input#subject").value,
    text: document.querySelector("textarea#msg-plain").value,
    html: document.querySelector("textarea#msg-html").value,
  };

  console.log(emailPayload)

  const response = await fetch("/emails/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailPayload),
  })
    .then(res => res.json())
    .catch(console.error);

  console.log(response);
  alert(JSON.stringify(response, null, 2));
};

form.addEventListener("submit", submitEmail);
