import { apiFetch } from "./client";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactMessage = ContactPayload & {
  id: number;
  createdAt: string;
  isRead: boolean;
};

/** Public — submit a contact message. */
export function sendContactMessage(payload: ContactPayload) {
  return apiFetch<ContactMessage>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Admin — list all received messages. */
export function getContactMessages(apiKey: string) {
  return apiFetch<ContactMessage[]>("/api/contact", {
    headers: { "X-Api-Key": apiKey },
  });
}
