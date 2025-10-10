const products = {
        potes: {
            duzentos: [
                { id: "1", name: "Açaí",                     retailPrice: 4.50, wholesalePrice: 3.00 },
                { id: "2", name: "Choco Rocher",             retailPrice: 4.50, wholesalePrice: 3.00 },
                { id: "3", name: "Ninho Trufado",            retailPrice: 4.50, wholesalePrice: 3.00 },
                { id: "4", name: "Tentação",                 retailPrice: 4.50, wholesalePrice: 3.00 },
            ],            
            quinhentos: [            
                { id: "5", name: "Açaí",                     retailPrice: 9.00, wholesalePrice: 5.60 },
            ],  
            LitroComum: [
                { id: "6", name: "Açaí",                     retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "7", name: "Oreo",                     retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "8", name: "Coco",                     retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "9", name: "Flocos",                   retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "10", name: "Morango",                  retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "11", name: "Tentação",                 retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "12", name: "Maracujá",                 retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "13", name: "Chocolate",                retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "14", name: "Ovomaltine",               retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "15", name: "Milho Verde",              retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "16", name: "Amendoim",                 retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "17", name: "Choco Rocher",             retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "18", name: "Leite Trufado",            retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "19", name: "Frutas Vermelhas",         retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "20", name: "Leite Condensado",         retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "21", name: "Abacaxi com Coco",         retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "22", name: "Graviola + Cupuaçu",       retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "23", name: "Banana Caramelizada",      retailPrice: 15.00, wholesalePrice: 9.50 },
                { id: "24", name: "Cappuccino + Caramelo Salgado", retailPrice: 15.00, wholesalePrice: 9.50 },
            ],
            doisLitros: [
                { id: "57", name: "Açaí",                     retailPrice: 24.00, wholesalePrice: 16.00 },
            ],
            litroPremium: [
                { id: "25", name: "Frozen",                   retailPrice: 20.00, wholesalePrice: 15.00 },
                { id: "26", name: "Pistache",                 retailPrice: 20.00, wholesalePrice: 15.00 },
                { id: "27", name: "Açaí Minho",               retailPrice: 20.00, wholesalePrice: 15.00 },
                { id: "28", name: "Romeu e Julieta",          retailPrice: 20.00, wholesalePrice: 15.00 },
                { id: "29", name: "Iogurte Grego + Maracujá", retailPrice: 20.00, wholesalePrice: 15.00 },
                { id: "30", name: "Iogurte Grego + Frutas Vermelhas", retailPrice: 20.00, wholesalePrice: 15.00 },
            ]
        },
        picoles: {
            agua: [
                { id: "31", name: "Uva",                       retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "32", name: "Limão",                     retailPrice: 2.50, wholesalePrice: 1.70 },
            ],
            leite: [          
                { id: "33", name: "Chocolate Branco",          retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "34", name: "Leite Condensado",          retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "35", name: "Coco c/ Abacaxi",           retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "36", name: "Romeu e Julieta",           retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "37", name: "Torta de Limão",            retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "38", name: "Doce de Leite",             retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "39", name: "Amendolim",                 retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "40", name: "Chocolate",                retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "41", name: "Maracujá",                 retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "42", name: "Morango",                  retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "43", name: "Graviola",                 retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "44", name: "Chiclete",                 retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "45", name: "Tapioca",                  retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "46", name: "Biscoito",                 retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "47", name: "Flocos",                   retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "48", name: "Milho",                    retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "49", name: "Coco",                     retailPrice: 2.50, wholesalePrice: 1.70 },
            ],
            especial: [
                { id: "50", name: "Skimó",                    retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "51", name: "Tentação",                 retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "52", name: "Brigadeiro",               retailPrice: 2.50, wholesalePrice: 1.70 },
                { id: "53", name: "Pé de Moleque",            retailPrice: 2.50, wholesalePrice: 1.70 },
            ]
        },
        caixas: [
            { id: "54", name: "5 Litros",                     retailPrice: 50.00, wholesalePrice: 45.00 },
            { id: "55", name: "5L Açaininho",                 retailPrice: 80.00, wholesalePrice: 65.00 },
            { id: "56", name: "10 Litros",                    retailPrice: 80.00, wholesalePrice: 73.00 },
        ]
    };

export default products;