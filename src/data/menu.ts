export type Lang = 'es' | 'en';

export interface MenuItemData {
  name: { es: string; en: string };
  description: { es: string; en: string };
  price: string;
  tag?: { es: string; en: string };
}

export interface MenuCategoryData {
  title: { es: string; en: string };
  items: MenuItemData[];
}

const item = (
  es: string,
  en: string,
  price: string,
  tag?: { es: string; en: string },
): MenuItemData => ({
  name: { es, en },
  description: { es: '', en: '' },
  price,
  tag,
});

export const menuCategories: MenuCategoryData[] = [
  {
    title: { es: 'Raciones', en: 'Sharing Plates' },
    items: [
      item('Alitas de pollo fritas', 'Fried chicken wings', '13 €'),
      item('Croquetas de jamón', 'Ham croquettes', '12,50 €'),
      item('Croquetas de setas', 'Mushroom croquettes', '13 €'),
      item('Torreznos de Soria', 'Soria-style torreznos', '13 €'),
      item('Morcilla de Burgos', 'Burgos blood sausage', '9 €'),
      item('Lágrimas de pollo', 'Chicken strips', '15 €'),
      item('Oreja', 'Crispy pig ear', '12,50 €'),
      item('Tortilla de patatas', 'Spanish potato omelette', '16 €'),
      item('Patatas bravas / alioli', 'Patatas bravas / alioli', '10 €'),
      item('Torreznos de Ávila', 'Ávila-style torreznos', '11 €', { es: 'Especialidad', en: 'Specialty' }),
      item('Tabla de queso', 'Cheese board', '12 €'),
      item('Tabla de ibéricos', 'Iberian charcuterie board', '18,50 €'),
    ],
  },
  {
    title: { es: 'Ensaladas', en: 'Salads' },
    items: [
      item('Mixta', 'Mixed salad', '10 €'),
      item('César', 'Caesar salad', '12 €'),
      item('Rusa', 'Russian salad', '10 €'),
    ],
  },
  {
    title: { es: 'Pescados', en: 'Fish' },
    items: [
      item('Calamares', 'Squid', '13 €'),
      item('Chopitos fritos', 'Fried baby squid', '14 €'),
      item('Chipirones', 'Small squid', '16 €'),
      item('Sepiola', 'Cuttlefish', '16 €'),
      item('Gambones', 'King prawns', '13 €'),
      item('Boquerones fritos', 'Fried anchovies', '13 €'),
      item('Rabas fritas', 'Fried squid strips', '12 €'),
    ],
  },
  {
    title: { es: 'Para compartir', en: 'To Share' },
    items: [
      item('Huevos rotos con jamón', 'Broken eggs with ham', '12,50 €'),
      item('Salchipapas', 'Sausage and fries', '10 €'),
      item('Secreto de cerdo en tiras con patatas', 'Strips of Iberian pork with potatoes', '15 €'),
      item('Entrecot de 300 gramos con patatas', '300g entrecôte with potatoes', '24 €'),
      item('Cachopo de ternera', 'Beef cachopo', '20 €'),
      item('Rabo de toro al vino tinto', 'Oxtail in red wine sauce', '20 €', { es: 'Especialidad de la casa', en: 'House specialty' }),
      item('Torreznos con revolcona', 'Torreznos with revolcona potatoes', '14 €', { es: 'Especialidad de la casa', en: 'House specialty' }),
    ],
  },
];
