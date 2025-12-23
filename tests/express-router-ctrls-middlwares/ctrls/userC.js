const getAllUsers = async (req, res) => {
    try {
        res.json({ msg: "Users route runing!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err });
    }
}

const addUser = async (req, res) => {
    res.send();
}

const updateUser = async (req, res) => {
    res.send();
}

const deleteUser = async (req, res) => {
    res.send();
}

const getPostById = async (req, res) => {
    try {
        res.json({ data: [{ id: 1 }, { id: 2 }] });
    } catch (err) {
        console.error(err);
        res.send("Error")
    }
}

export {
    getAllUsers,
    getPostById,
    addUser,
    updateUser,
    deleteUser,
}