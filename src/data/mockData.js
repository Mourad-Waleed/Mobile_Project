// Mock data for the initial UI. Shapes follow the planned data model
// (User, FoodProvider) so they can later be swapped for a repository.

export const currentUser = {
  userId: 'u1',
  displayName: 'Nour',
};

export const providers = [
  { providerId: 'p1', name: 'Cairo Koshary House', cuisine: 'Egyptian', isAvailable: true },
  { providerId: 'p2', name: 'Nile Grill', cuisine: 'Grills & Kebab', isAvailable: true },
  { providerId: 'p3', name: 'Falafel Express', cuisine: 'Egyptian Street Food', isAvailable: true },
  { providerId: 'p4', name: 'Sushi Garden', cuisine: 'Japanese', isAvailable: false },
  { providerId: 'p5', name: 'Burger Yard', cuisine: 'Burgers', isAvailable: true },
  { providerId: 'p6', name: 'Green Bowl', cuisine: 'Healthy & Salads', isAvailable: true },
  { providerId: 'p7', name: 'Pasta Corner', cuisine: 'Italian', isAvailable: false },
];
