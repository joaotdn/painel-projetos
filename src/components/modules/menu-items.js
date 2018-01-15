export default function menuItems(idEmissor, slug) {
    return [
        {
            to: `/emissor/${idEmissor}/horas-executadas`,
            label: 'Horas executadas'
        },
        {
            to: `/emissor/${idEmissor}/ultimos-entregues`,
            label: 'Últimos projetos entregues'
        },
        {
            to: `/emissor/${idEmissor}/em-andamento`,
            label: 'Projetos em andamento'
        },
        {
            to: `/emissor/${idEmissor}/planejados`,
            label: 'Projetos planejados'
        },
        {
            to: `/emissor/${idEmissor}/horas-planejadas`,
            label: 'Horas planejadas'
        }
    ];
};