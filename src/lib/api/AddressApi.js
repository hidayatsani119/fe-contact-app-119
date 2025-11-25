// GET /api/contacts/:contactId/addresses
export const addressList = async (token, contactId) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses`);
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      Authorization: token,
    },
  });
};

// DELETE /api/contacts/:contactId/addresses/:addressId
export const addressDelete = async (token, contactId, addressId) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses/${addressId}`);
  return await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "Application/json",
      Authorization: token,
    },
  });
};

// CREATE /api/contacts/:contactId/addresses
//  "street" : "Jalan apa",
//   "city" : "Kota apa",
//   "province" : "Provinsi apa",
//   "country" : "Negara apa",
//   "postal_code" : "Kode pos"
export const addressCreate = async (token, contactId, { street, city, province, country, postal_code }) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses/`);
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      Accept: "Application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      street,
      city,
      province,
      country,
      postal_code,
    }),
  });
};

// PUT /api/contacts/:contactId/addresses/:addressId
export const addressUpdate = async (token, contactId, addressId, { street, city, province, country, postal_code }) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses/${addressId}`);
  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
      Accept: "Application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      street,
      city,
      province,
      country,
      postal_code,
    }),
  });
};

export const addressDetail = async (token, contactId, addressId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses/${addressId}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      Authorization: token,
    },
  });
};
