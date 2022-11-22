import Model from '../../../database/models';
const httpStatus = require('http-status');

const create = async (req, res) => {
    try {
        const ob = await Model.portfolio.create(req.body);
        return res.status(httpStatus.CREATED).send('Success');

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await Model.portfolio.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updated = await Model.portfolio.findOne({ where: { id: id } });
            return res.status(httpStatus.OK).send('Success');
        }
        throw new Error('Not found');
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Model.portfolio.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(httpStatus.NO_CONTENT).send('Success');
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
};


module.exports = {
    create,
    remove,
    update
};
