// Importo base de datos de firabase
import { db, auth } from "lib/firebase";

export default async (req, res) => {
    console.log(req.body);
    const { 
        postId,
        userData,
        data,
    } = req.body;
            // Crear una nueva entrar en la coleccion usuarios con el mismo ID que el de la autenticacion

    const {likes} = data;

            return await db
                .collection("posts")
                .doc(postId)
                .update(
                    {
                        likes: [...likes, userData]
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
            
            
            
};