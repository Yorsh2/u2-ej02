const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');

const schema = fs.readFileSync("./schema.gql", "utf8");

const libro = [
    { idL: "1", titulo: "Principito", autor: "Antoine de Saint-Exupéry", isbn: "212124", year_publicacion: "1943" },
    { idL: "2", titulo: "Guía del autoestopista galáctico", autor: "Douglas Adams", isbn: "9788499082565", year_publicacion: "1979" },
    { idL: "3", titulo: "1984", autor: "Gabriel García Márquez", isbn: "9788408170049", year_publicacion: "1949" },
    { idL: "4", titulo: "El código Da Vinci", autor: "George Orwell", isbn: "9788490322076", year_publicacion: "2003" }
]
const autor = [
    { idA: "1", nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
    { idA: "2", nombre: "Douglas Adams", nacionalidad: "Reino Unido" },
    { idA: "3", nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
    { idA: "4", nombre: "George Orwell", nacionalidad: "Reino Unido" }
]
const Prestamo = [
    { idP: "1", libro_id: "1", usuario: "Juan Pérez", f_Prestamo: "2024-03-15", f_Devolucion: "2024-04-15" },
    { idP: "2", libro_id: "2", usuario: "María Gómez", f_Prestamo: "2024-03-10", f_Devolucion: "2024-04-10" },
    { idP: "3", libro_id: "3", usuario: "Carlos Martínez", f_Prestamo: "2024-03-08", f_Devolucion: "2024-04-08" },
    { idP: "4", libro_id: "4", usuario: "Ana López", f_Prestamo: "2024-03-20", f_Devolucion: "2024-04-20" }
]



const resolvers = {
    Query: {
        todosLosLibros: () => libro,
        todosLosAutores:()=> autor,
        todosLosPrestamos:()=> Prestamo,
        libroPorID:(parent, {idA}) => libro.find(Libro => Libro.autor === idA)
        
    }, 
}

const server = new ApolloServer({
    typeDefs: gql(schema),
    resolvers
});

server.listen().then(({url}) =>{
    console.log(`Servidor corriendo en ${url}`);
})