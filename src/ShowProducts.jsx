const ShowProducts = ({ products, category }) => {

    if (!products[category]) {
        return <p>Carregando produtos...</p>;
    }


    if (category === "caixas") {
        return (
            <div id="caixas">
                <ul>
                    {products[category].map((product) => (
                        <li key={product.id}>
                            {product.name}: {product.retailPrice} / {product.wholesalePrice}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    else if (category === "potes") {
        return (
            <div className="grid" >
                {Object.keys(products[category]).map((subcategoryKey) => {
                    const subcategoryArray = products[category][subcategoryKey];
                    return (
                        <div>
                            <div key={subcategoryKey} id={subcategoryKey}>
                                <h3>
                                    <span>{subcategoryKey == "duzentos" ? "200 ML" : 
                                           subcategoryKey == "quinhentos" ? "500 ML" : 
                                           subcategoryKey == "LitroComum" ? "1 Litro Comum" :
                                           subcategoryKey == "litroPremium" ? "1 Litro Premium" : subcategoryKey}:</span> 
                                    <span>Varejo</span> 
                                    <span>Atacado</span>
                                </h3>
                                <ul>
                                    {subcategoryArray.map((product) => (
                                        <li key={product.id}>
                                            <span>{product.name}:</span> <span>{product.retailPrice}</span> <span>{product.wholesalePrice}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="img-container" id={`img-${subcategoryKey}`}>
                                <img src={`/img/${subcategoryKey == "duzentos" ? "sorvete1" :
                                                  subcategoryKey == "quinhentos" ? "pote_ninho" :
                                                  subcategoryKey == "LitroComum" ? "pote_choco" :
                                                  subcategoryKey == "litroPremium" ? "sorvete2" : subcategoryKey}.png`} alt={subcategoryKey} />
                                {subcategoryKey == "LitroComum" ? (
                                    <img src={`/img/sorvete_oreo.png`} alt="Comparação Litro Comum vs Premium" style={{ marginTop: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                                ) : null}
                            </div>
                        </div>
                    )

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
                        <div>
                            <div key={subcategoryKey} id={subcategoryKey}>
                                <h3><span>{subcategoryKey}:</span> <span>Varejo</span> <span>Atacado</span></h3>
                                <ul>
                                    {subcategoryArray.map((product) => (
                                        <li key={product.id}>
                                            <span>{product.name}:</span> <span>{product.retailPrice}</span> <span>{product.wholesalePrice}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <img src={`/img/${subcategoryKey}.jpg`} alt={subcategoryKey} />
                        </div>
                    )

                })}
            </div>
        );
    }

    return <div><p>Categoria não encontrada</p></div>
};

export default ShowProducts;