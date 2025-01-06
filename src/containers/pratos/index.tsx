import { useParams } from "react-router-dom";
import { Title } from "../../components/title/style";
import { Container } from "../../components/container/style";
import { pratosData } from "../../data/pratos.ts";

const PratosRestaurante = () => {
    const { id } = useParams<{ id: string }>();
    const pratos = pratosData.filter((prato) => prato.restauranteId === Number(id));

    if (pratos.length === 0) {
        return <Title size="24px">Nenhum prato encontrado para este restaurante!</Title>;
    }

    return (
        <Container>
            {pratos.map((prato) => (
                <div key={prato.id}>
                    <img src={prato.imagem} alt={prato.nome} />
                    <Title size="18px" weight="700">{prato.nome}</Title>
                    <p>{prato.descricao}</p>
                </div>
            ))}
        </Container>
    );
};

export default PratosRestaurante;
