// Importo base de datos de firabase
import { db, auth } from "lib/firebase";

export default async (req, res) => {
    console.log(req.body);

    const {
        user_id, 
        favourites, 
        posts
    } = req.body;

    console.log("ESTO ES LO QUE LLEGO DE FAVORITOS", favourites);
    console.log("ESTO ES LO QUE LLEGO DE POSTS", posts);
            // Crear una nueva entrar en la coleccion usuarios con el mismo ID que el de la autenticacion
            if(favourites){
            return await db
                .collection("users")
                .doc(user_id)
                .update(
                    {
                        favoritos: [...favourites, req.body],
                    }
                )
                .then(() => {
                    console.log("Firebase 5 - Usuario actualizado");

                    // Manda la usuario dentro del browser
                    // res.writeHead(302, { Location: "/login" }); //NOT WORKING

                    res.status(200).json({ message: 'Favoritos actualizado' })
                    res.end();
                })
                .catch((error) =>
                    console.log("Hubo un error creando el usuario", error)
                );
            }
            if(posts){
                return await db
                    .collection("users")
                    .doc(user_id)
                    .update(
                        {
                            posts: [...posts, req.body]
                        }
                    )
                    .then(() => {
                        console.log("Firebase 5 - Usuario actualizado");
    
                        // Manda la usuario dentro del browser
                        // res.writeHead(302, { Location: "/login" }); //NOT WORKING
    
                        res.status(200).json({ message: 'Favoritos actualizado' })
                        res.end();
                    })
                    .catch((error) =>
                        console.log("Hubo un error creando el usuario", error)
                    );
                }

};