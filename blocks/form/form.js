import createField from './form-fields.js';
async function createForm(formHref, submitHref) {
  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();

  const form = document.createElement('form');
  form.dataset.action = submitHref;

  const fields = await Promise.all(json.data.map((fd) => createField(fd, form)));
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    form.querySelectorAll(`[data-fieldset="${fieldset.name}"`).forEach((field) => {
      fieldset.append(field);
    });
  });

  return form;
}

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === 'checkbox') {
        if (field.checked) payload[field.name] = payload[field.name] ? `${payload[field.name]},${field.value}` : field.value;
      } else {
        payload[field.name] = field.value;
      }
    }
  });
  return payload;
}


function showLoader() {
  const loaderContainer = document.createElement('div');
  loaderContainer.className = 'loader-container';

  const loader = document.createElement('div');
  loader.className = 'loader';
  
  loaderContainer.appendChild(loader);
  document.body.appendChild(loaderContainer);
}


// Function to hide loader
function hideLoader(form) {
  const loader = form.querySelector('.loader');
  if (loader) {
    form.removeChild(loader);
  }
}


// async function handleSubmit(form) {
//   if (form.getAttribute('data-submitting') === 'true') return;

//   const submit = form.querySelector('button[type="submit"]');
//   try {
//     form.setAttribute('data-submitting', 'true');
//     submit.disabled = true;

//     // create payload
//     const payload = generatePayload(form);
//     console.log("apiURL---->",JSON.stringify(form.dataset.action))
//     console.log("apiRequest--->",JSON.stringify(payload))
//     const response = await fetch(form.dataset.action, {
//       method: 'POST',
//       body: JSON.stringify({ data: payload }),
     
//     });
//     const responseData = await response.json(); // or .text(), depending on your API response type
//     console.log("apiResponseBody---->", JSON.stringify(responseData));
//     if (response.ok) {
//       if (form.dataset.confirmation) {
//         window.location.href = form.dataset.confirmation;
//         // alert(JSON.stringify(responseData))
//       }
//     } else {
//       const error = await response.text();
//       throw new Error(error);
//     }
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.error(e);
//   } finally {
//     form.setAttribute('data-submitting', 'false');
//     submit.disabled = false;
//   }
// }

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;
    showLoader(form);

    // Create payload
    const payload = generatePayload(form);
    console.log("apiURL---->", JSON.stringify(form.dataset.action));
    console.log("apiRequest--->", JSON.stringify(payload));
    const response = await fetch(form.dataset.action, {
      // mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify({ data: payload }),
    });
    const responseData = await response.json(); // or .text(), depending on your API response type
    console.log("apiResponseBody---->", JSON.stringify(responseData));
    if (response.ok) {
      if (form.dataset.confirmation) {
        window.location.href = form.dataset.confirmation;
        // alert(JSON.stringify(responseData))
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;
    hideLoader(form);
  }
}

export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')].map((a) => a.href);
  const formLink = links.find((link) => link.startsWith(window.location.origin) && link.endsWith('.json'));
  const submitLink = links.find((link) => link !== formLink);
  if (!formLink || !submitLink) return;

  const form = await createForm(formLink, submitLink);
  block.replaceChildren(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = form.checkValidity();
    if (valid) {
      handleSubmit(form);
    } else {
      const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
      if (firstInvalidEl) {
        firstInvalidEl.focus();
        firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}