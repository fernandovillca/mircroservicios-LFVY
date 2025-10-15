import { createApi } from "./axiosBase";

const eventsApi = createApi("http://localhost:4000");

export const EventsService = {
  getEvents() {
    return eventsApi.get("/events");
  },
  createEvent(eventData) {
    return eventsApi.post("/events", eventData);
  },
  updateEvent(eventId, eventData) {
    return eventsApi.put(`/events/${eventId}`, eventData);
  },
  deleteEvent(eventId) {
    return eventsApi.delete(`/events/${eventId}`);
  },
  getEventById(eventId) {
    return eventsApi.get(`/events/${eventId}`);
  },
};
