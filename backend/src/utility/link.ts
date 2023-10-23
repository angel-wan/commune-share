// generate invite link with event id

export const inviteLink = async (eventId: string) => {
  try {
    return `http://localhost:3000/event/${eventId}`;
  } catch (error) {
    console.error('Error generating invite link:', error);
  }
};
