

module.exports = {
    display(homepage){
        let header,content;
        switch (homepage){
            case 'home':
                header = "Homepage";
                content = "<p>Bem vindo a pagina inicial do Projeto Web Backend<p>"
                console.log("a");
                break;
            case 'reg':
                header = "Register";
                content = "<form action=\"\reg\" method=\"POST\">"
                content +="<input type=\"hidden\" name=\"id\" value=\"{{.}}\"></input>"
                content +="<label for=\"username\">Username: </label>"
                content +="<input type=\"text\" id=\"username\" name=\"username\" required><br><br>"
                content +="<label for=\"password\">Password: </label>"
                content +="<input type=\"password\" id=\"password\" name=\"password\" required><br><br>"
                content +="<label for=\"name\">Name: </label>"
                content +="<input type=\"text\" id=\"name\" name=\"name\" required><br><br>"
                content +="<input type=\"submit\" value=\"Register\"></input></form>"
                break;
            case 'log':
                header = "<h2>Login</h2>";
                content = "<form action=\"\log\" method=\"POST\">"
                content +="<label for=\"username\">Username: </label>"
                content +="<input type=\"text\" id=\"username\" name=\"username\" required><br><br>"
                content +="<label for=\"password\">Password:</label>"
                content +="<input type=\"password\" id=\"password\" name=\"password\" required><br><br>"
                content +="<input type=\"submit\" value=\"Login\"></input></form>"
                break;
            default:
                console.log('Cant display body');
        }
        return {header: ("<h2>"+header+"</h2>"), content: ("<div>"+content+"</div>")}
    }
}