// Importo base de datos de firabase
import { db } from "lib/firebase";

export default async (req, res) => {
    const {
        user_id,
        name,
        country,
        link,
        description,
        type,
        lat,
        lng
    } = req.body;

    return await db
        .collection("posts")
        .doc()
        .set(
            {
                name,
                country,
                link,
                description,
                type,
                lat,
                lng,
                user_id,
                likes: []
            }
        )
        .then(() => {
            console.log("Firebase 4 - Post Creado");
            res.status(200).json({ message: 'Post Creado', name })
            res.end();
        })
        .catch((error) =>
            console.log("Hubo un error creando el post", error)
        );

};