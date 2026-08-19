export type MenuProduct = {
  name: string;
  retailPrice: number;
  wholesalePrice: number;
};

export type MenuSubcategory = {
  key: string;
  name: string;
  products: MenuProduct[];
};

export type MenuCategory = {
  name: string;
  slug: string;
  subcategories: MenuSubcategory[];
};

export const menuData: MenuCategory[] = [
  {
    name: "Potes",
    slug: "potes",
    subcategories: [
      {
        key: "duzentos",
        name: "200 ml",
        products: [
          { name: "Açaí", retailPrice: 4.5, wholesalePrice: 3.0 },
          { name: "Choco Rocher", retailPrice: 4.5, wholesalePrice: 3.0 },
          { name: "Ninho Trufado", retailPrice: 4.5, wholesalePrice: 3.0 },
          { name: "Tentação", retailPrice: 4.5, wholesalePrice: 3.0 },
        ],
      },
      {
        key: "quinhentos",
        name: "500 ml",
        products: [{ name: "Açaí", retailPrice: 9.0, wholesalePrice: 5.6 }],
      },
      {
        key: "litroComum",
        name: "1 Litro",
        products: [
          { name: "Açaí", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Oreo", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Coco", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Flocos", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Morango", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Tentação", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Maracujá", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Chocolate", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Ovomaltine", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Amendoim", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Milho Verde", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Leite Trufado", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Choco Rocher", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Frutas Vermelhas", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Leite Condensado", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Abacaxi com Coco", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Graviola + Cupuaçu", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Banana Caramelizada", retailPrice: 15.0, wholesalePrice: 9.5 },
          { name: "Cappuccino + Caramelo Salgado", retailPrice: 15.0, wholesalePrice: 9.5 },
        ],
      },
      {
        key: "doisLitros",
        name: "2 Litros",
        products: [{ name: "Açaí", retailPrice: 24.0, wholesalePrice: 16.0 }],
      },
      {
        key: "litroPremium",
        name: "1 Litro Premium",
        products: [
          { name: "Açaí zero açúcar", retailPrice: 25.0, wholesalePrice: 18.0 },
          { name: "Frozen", retailPrice: 20.0, wholesalePrice: 15.0 },
          { name: "Pistache", retailPrice: 20.0, wholesalePrice: 15.0 },
          { name: "Açaí Minho", retailPrice: 20.0, wholesalePrice: 15.0 },
          { name: "Romeu e Julieta", retailPrice: 20.0, wholesalePrice: 15.0 },
          { name: "Iogurte Grego + Maracujá", retailPrice: 20.0, wholesalePrice: 15.0 },
          { name: "Iogurte Grego + Frutas Vermelhas", retailPrice: 20.0, wholesalePrice: 15.0 },
        ],
      },
    ],
  },
  {
    name: "Picolés",
    slug: "picoles",
    subcategories: [
      {
        key: "agua",
        name: "Água",
        products: [
          { name: "Uva", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Limão", retailPrice: 3.0, wholesalePrice: 2.1 },
        ],
      },
      {
        key: "leite",
        name: "Leite",
        products: [
          { name: "Chocolate Branco", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Leite Condensado", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Coco c/ Abacaxi", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Romeu e Julieta", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Torta de Limão", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Doce de Leite", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Amendolim", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Chocolate", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Maracujá", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Morango", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Graviola", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Chiclete", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Tapioca", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Biscoito", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Flocos", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Milho", retailPrice: 3.0, wholesalePrice: 2.1 },
          { name: "Coco", retailPrice: 3.0, wholesalePrice: 2.1 },
        ],
      },
      {
        key: "especial",
        name: "Especial",
        products: [
          { name: "Skimó", retailPrice: 5.0, wholesalePrice: 3.0 },
          { name: "Tentação", retailPrice: 5.0, wholesalePrice: 3.0 },
          { name: "Brigadeiro", retailPrice: 5.0, wholesalePrice: 3.0 },
          { name: "Pé de Moleque", retailPrice: 5.0, wholesalePrice: 3.0 },
        ],
      },
    ],
  },
  {
    name: "Caixas",
    slug: "caixas",
    subcategories: [
      {
        key: "cincoTradicional",
        name: "Caixa 5 Tradicional",
        products: [
          { name: "Choco Rocher", retailPrice: 50.0, wholesalePrice: 45.0 },
          { name: "Ninho Trufado", retailPrice: 50.0, wholesalePrice: 45.0 },
          { name: "Tentação", retailPrice: 50.0, wholesalePrice: 45.0 },
        ],
      },
      {
        key: "cincoPremium",
        name: "Caixa 5 Premium",
        products: [
          { name: "Frozen", retailPrice: 80.0, wholesalePrice: 65.0 },
          { name: "Cupuaçu", retailPrice: 80.0, wholesalePrice: 65.0 },
          { name: "Açaininho", retailPrice: 80.0, wholesalePrice: 65.0 },
        ],
      },
      {
        key: "dezTradicional",
        name: "Caixa 10 Tradicional",
        products: [{ name: "Sabores diversos", retailPrice: 80.0, wholesalePrice: 73.0 }],
      },
    ],
  },
];
