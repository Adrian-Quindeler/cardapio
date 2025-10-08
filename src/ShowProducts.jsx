import RenderizaCaixa from "./categories/RenderizaCaixa";
import RenderizaPote from "./categories/RenderizaPote";
import RenderizaPicole from "./categories/RenderizaPicole";

const ShowProducts = ({ products, category }) => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    if (!products[category]) {
        return <p>Carregando produtos...</p>;
    }


    if (category === "caixas") {
        return (
            <div className="grid">
                {products[category].map((product, index) => (
                    <RenderizaCaixa product={product} key={index} />
                ))}
            </div>
        );
    }
    else if (category === "potes") {
        return (
            <div className="grid" >
                {Object.keys(products[category]).map((subcategoryKey) => {
                    const subcategoryArray = products[category][subcategoryKey];
                    return (
                        <RenderizaPote Key={subcategoryKey} Array={subcategoryArray} key={subcategoryKey} />
                    );
                })}
            </div>
        );
    }
    else if (category == "picoles") {
        return (
            <div className="grid" >
                {Object.keys(products[category]).map((subcategoryKey) => {
                    const subcategoryArray = products[category][subcategoryKey];
                    return (
                        <RenderizaPicole Key={subcategoryKey} Array={subcategoryArray} key={subcategoryKey} />
                    );
                })}
            </div>
        );
    }

    return <div><p>Categoria não encontrada</p></div>
};

export default ShowProducts;