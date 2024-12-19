// Decodificar o token manualmente
function decodificarToken(token) {
  try {
    const payloadBase64 = token.split(".")[1]; // Pega a parte do payload
    const decodedPayload = JSON.parse(atob(payloadBase64)); // Decodifica do Base64
    return decodedPayload;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

// Função para iniciar o logoff automático
export function iniciarLogoffAutomatico() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const payload = decodificarToken(token);
  if (!payload || !payload.exp) return;

  const tempoRestante = payload.exp * 1000 - Date.now(); // Calcula o tempo restante em milissegundos

  if (tempoRestante > 0) {
    setTimeout(() => {
      handleLogoff();
    }, tempoRestante);
  } else {
    handleLogoff(); // Token já expirado
  }
}

// Função para lidar com o logoff
export function handleLogoff() {
  alert("Sua sessão expirou. Faça login novamente.");
  localStorage.clear();
  window.location.href = "/login";
}
