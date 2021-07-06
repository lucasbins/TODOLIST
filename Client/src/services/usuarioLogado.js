export function pegaUsuarioLogado() {
    if (window.localStorage.length > 0) {
        return JSON.parse(window.localStorage.getItem('usuarioLogado'));
    }
    return false;
}

export function verificaSePossuiUsuarioLogado() {
    const user = pegaUsuarioLogado();
    return !!user
}

export function deslogar() {
    console.log('Usuario deslogado')
    localStorage.clear();
}

