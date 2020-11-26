// Importo base de datos de firabase
import { db } from "lib/firebase";

export default async (req, res) => {
    const {
        id
    } = req.body;

    return await db
        .collection("posts")
        .doc(id)
        .delete()
        .then(() => {
            console.log("Firebase 4 - Post Borrado");
            res.status(200).json({ message: 'Post Borrado', id })
            res.end();
        })
        .catch((error) =>
            console.log("Hubo un error borrando el post", error)
        );
};