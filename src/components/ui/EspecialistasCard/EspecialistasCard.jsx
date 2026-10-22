function EspecialistasCard(props) {
    return (
        <div className="especialistas_card">
            {props.FotoDra && (
                <img
                    src={props.FotoDra}
                    alt={`Foto da ${props.NomeDra}`}
                    className="foto-especialista"
                />
            )}
            <h3>{props.NomeDra}</h3>
            <p>{props.FuncaoDra}</p>
        </div>
    )
} export default EspecialistasCard;