# Política de Seguridad

## Alcance

Este repositorio es un sitio estático de marketing (SSG, sin cuentas de
usuario, sin backend, sin base de datos). Los formularios (`/contact`,
`/download`) envían directamente a EmailJS desde el navegador; no hay
servidor propio manejando esos datos. No hay inicio de sesión ni datos
de usuario almacenados. Las preocupaciones realistas aquí son cosas
como: una dependencia con una vulnerabilidad conocida, una forma de
sortear la Content Security Policy, un vector de cross-site scripting,
o un problema de supply-chain de build/CI — no toma de control de
cuenta ni una filtración de datos, ya que ni las cuentas ni los datos de
usuario almacenados existen.

## Versiones soportadas

Hay una única versión desplegada: la que esté en la rama `main` y en
vivo en producción. No hay matriz de versiones ni rama LTS que seguir.

## Cómo reportar una vulnerabilidad

Por favor no abras un issue público para un reporte de seguridad. En su
lugar:

1. Preferí el reporte privado de vulnerabilidades de GitHub: pestaña
   **Security** → **Report a vulnerability**. Si esa opción no aparece
   en este repositorio, todavía no se ha habilitado. Usá el respaldo
   por correo de abajo.
2. Respaldo: enviá un correo a
   [matiasdario75@gmail.com](mailto:matiasdario75@gmail.com) con
   "SECURITY" en el asunto.

Incluí, en la medida de lo posible:

- Qué es la vulnerabilidad y su impacto potencial.
- Pasos para reproducirla (una URL, un payload, una solicitud).
- El commit o la versión desplegada contra la que probaste.

## Expectativas de respuesta

Este es un proyecto personal mantenido por una sola persona, no una
empresa con un equipo de seguridad: no hay un SLA de tiempo de
respuesta garantizado. Los reportes se toman en serio y se reconocen
tan pronto como sea razonablemente posible, típicamente en unos pocos
días.

## Divulgación

Por favor dá un tiempo razonable para atender un problema confirmado
antes de cualquier divulgación pública. El crédito se da con gusto en
el mensaje de commit de la corrección o en las notas de la versión, si
así lo querés.
