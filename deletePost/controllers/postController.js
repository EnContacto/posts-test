const { dynamoDB, s3 } = require("../config/awsConfig");

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "El ID del post es requerido." });
    }

    try {
        // Obtener el post antes de eliminarlo
        const postData = await dynamoDB.client.get({
            TableName: dynamoDB.tableName,
            Key: { id }
        }).promise();

        if (!postData.Item) {
            return res.status(404).json({ error: "El post no existe." });
        }

        // Eliminar imagen del bucket S3 si existe
        if (postData.Item.imageUrl) {
            const imageKey = postData.Item.imageUrl.split('/').pop();
            await s3.client.deleteObject({
                Bucket: s3.bucketName,
                Key: imageKey
            }).promise();
        }

        // Eliminar el post de DynamoDB
        await dynamoDB.client.delete({
            TableName: dynamoDB.tableName,
            Key: { id }
        }).promise();

        res.json({ message: "Post eliminado correctamente." });
    } catch (error) {
        console.error("Error eliminando el post:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
