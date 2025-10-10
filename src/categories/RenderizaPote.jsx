const RenderizaPote = ({ Key, Array }) => {
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div>
            <div key={Key} id={Key}>
                <h3>
                    <span>{Key == "duzentos" ? "200 ML" : 
                            Key == "quinhentos" ? "500 ML" : 
                            Key == "LitroComum" ? "1 Litro Comum" :
                            Key == "doisLitros" ? "2 Litros" :
                            Key == "litroPremium" ? "1 Litro Premium" : Key}:</span> 
                    <span>Varejo</span> 
                    <span className="atacado">Atacado {Key == "duzentos" ? <><span className="unidades">(50 Un.)</span></> : 
                                                       Key == "quinhentos" ? <><span className="unidades">(50 Un.)</span></> : 
                                                       Key == "LitroComum" ? <><span className="unidades">(50 Un.)</span></> :
                                                       Key == "doisLitros" ? <><span className="unidades">(30 Un.)</span></> :
                                                       Key == "litroPremium" ? <><span className="unidades">(30 Un.)</span></> : ''}</span>
                </h3>
                <ul>
                    {Array.map((product) => (
                        <li key={product.id}>
                            <span>{product.name}</span> <span>{formatPrice(product.retailPrice)}</span> <span className="atacado">{formatPrice(product.wholesalePrice)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="img-container" id={`img-${Key}`}>
                <img src={`/img/${Key == "duzentos" ? "sorvete1" :
                                    Key == "quinhentos" ? "pote_ninho" :
                                    Key == "LitroComum" ? "pote_choco" :
                                    Key == "doisLitros" ? "dois_litros" :
                                    Key == "litroPremium" ? "sorvete2" : Key}.png`} alt={Key} />
                {Key == "LitroComum" ? (
                    <img src={`/img/sorvete_oreo.png`} alt="Comparação Litro Comum vs Premium" style={{ marginTop: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                ) : null}
            </div>
        </div>
    )
}

export default RenderizaPote;