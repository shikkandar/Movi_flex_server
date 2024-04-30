export default function seats() {
  const categories = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O','P','Q','R',"S"];
  const seatsPerCategory = 20;
  const result = {};

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const categorySeats = {};

    for (let j = 1; j <= seatsPerCategory; j++) {
      const seatName = `${category}${j}`;
      categorySeats[seatName] = { occupied: false, username: null, userId: null };
    }

    result[category] = categorySeats;
  }

  return result;
}

/**Model data */

  const bookingTime = {
    "11:00-AM": [
        {
            "A": {
                "A1": {
                    "occupied": false,
                    "username": null,
                    "userId": null
                },
                // Other seats in category A
            },
            // Other categories...
        }
    ]
};

