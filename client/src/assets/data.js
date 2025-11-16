export const dummyRoom = {
  roomName: "Developers Discussion",
  description: "Team discussion, daily updates, and project coordination.",
};

export const dummyUsers = [
  {
    _id: "u1",
    name: "Alice Johnson",
    email: "alice@mail.com",
  },
  {
    _id: "u2",
    name: "Bob Martin",
    email: "bob@mail.com",
  },
  {
    _id: "u3",
    name: "Charlie Room",
    email: "charlie@mail.com",
  },
  {
    _id: "u4",
    name: "You",
    email: "me@mail.com",
  },
];

export const dummyMessages = [
  // ==== TODAY ====
  {
    _id: "m1",
    msg: "Hey everyone!",
    createdAt: "2025-11-14T09:05:00Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m2",
    msg: "Hello Alice!",
    createdAt: "2025-11-14T09:06:30Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m3",
    msg: "How is the work going?",
    createdAt: "2025-11-14T09:07:10Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m4",
    msg: "Pretty good so far.",
    createdAt: "2025-11-14T09:08:50Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m5",
    msg: "Nice! I'm almost done with the UI fixes.",
    createdAt: "2025-11-14T10:15:00Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m6",
    msg: "Anyone up for a meeting at 3 PM?",
    createdAt: "2025-11-14T11:30:00Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },
  {
    _id: "m7",
    msg: "Works for me!",
    createdAt: "2025-11-14T11:31:20Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m8",
    msg: "Same here.",
    createdAt: "2025-11-14T11:35:00Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m9",
    msg: "Cool. Let's meet at 3!",
    createdAt: "2025-11-14T11:36:10Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },
  {
    _id: "m10",
    msg: "Reminder: The meeting is in 5 minutes.",
    createdAt: "2025-11-14T14:55:40Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },

  // ==== YESTERDAY ====
  {
    _id: "m11",
    msg: "Good morning guys!",
    createdAt: "2025-11-13T08:00:00Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m12",
    msg: "Morning! Ready for today's tasks?",
    createdAt: "2025-11-13T08:02:10Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m13",
    msg: "Yep, let's do this 💪",
    createdAt: "2025-11-13T08:05:20Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m14",
    msg: "I pushed the new API updates.",
    createdAt: "2025-11-13T10:30:00Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },
  {
    _id: "m15",
    msg: "Thanks Charlie!",
    createdAt: "2025-11-13T10:32:40Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m16",
    msg: "Anyone facing issues with auth?",
    createdAt: "2025-11-13T14:10:00Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m17",
    msg: "Working perfectly here.",
    createdAt: "2025-11-13T14:12:15Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m18",
    msg: "Same for me.",
    createdAt: "2025-11-13T14:13:40Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m19",
    msg: "Ok then, might be cache.",
    createdAt: "2025-11-13T14:15:50Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m20",
    msg: "Try restarting your server.",
    createdAt: "2025-11-13T14:16:40Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },

  // ==== 3 DAYS AGO ====
  {
    _id: "m21",
    msg: "Hello team!",
    createdAt: "2025-11-11T09:00:00Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m22",
    msg: "Hey Alice!",
    createdAt: "2025-11-11T09:01:00Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m23",
    msg: "We have a deployment today.",
    createdAt: "2025-11-11T09:02:40Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },
  {
    _id: "m24",
    msg: "Noted.",
    createdAt: "2025-11-11T09:03:55Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m25",
    msg: "Let’s test everything by noon.",
    createdAt: "2025-11-11T09:05:00Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m26",
    msg: "Will do!",
    createdAt: "2025-11-11T09:06:40Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m27",
    msg: "UI part is almost done.",
    createdAt: "2025-11-11T11:15:30Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m28",
    msg: "Nice!",
    createdAt: "2025-11-11T11:16:50Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },
  {
    _id: "m29",
    msg: "API is ready too.",
    createdAt: "2025-11-11T11:18:25Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m30",
    msg: "Let's deploy after lunch.",
    createdAt: "2025-11-11T11:20:00Z",
    user: { name: "You", email: "me@mail.com" },
  },

  // ==== LAST WEEK ====
  {
    _id: "m31",
    msg: "Morning people!",
    createdAt: "2025-11-07T08:00:00Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },
  {
    _id: "m32",
    msg: "Morning!",
    createdAt: "2025-11-07T08:05:00Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m33",
    msg: "Did the server restart last night?",
    createdAt: "2025-11-07T09:10:00Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m34",
    msg: "Yep, everything looks fine.",
    createdAt: "2025-11-07T09:12:40Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m35",
    msg: "Great!",
    createdAt: "2025-11-07T09:13:20Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },

  // ==== OLDER ====
  {
    _id: "m36",
    msg: "Starting new sprint today.",
    createdAt: "2025-10-29T10:00:00Z",
    user: { name: "Alice Johnson", email: "alice@mail.com" },
  },
  {
    _id: "m37",
    msg: "Let's go team!",
    createdAt: "2025-10-29T10:02:10Z",
    user: { name: "You", email: "me@mail.com" },
  },
  {
    _id: "m38",
    msg: "I will handle backend tasks.",
    createdAt: "2025-10-29T10:03:25Z",
    user: { name: "Bob Martin", email: "bob@mail.com" },
  },
  {
    _id: "m39",
    msg: "I'll take UI as usual.",
    createdAt: "2025-10-29T10:04:50Z",
    user: { name: "Charlie Room", email: "charlie@mail.com" },
  },
  {
    _id: "m40",
    msg: "Cool.",
    createdAt: "2025-10-29T10:05:35Z",
    user: { name: "You", email: "me@mail.com" },
  },
];
