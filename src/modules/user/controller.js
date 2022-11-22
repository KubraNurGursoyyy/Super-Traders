import Model from '../../../database/models';
import { PortfolioRoutes } from '../portfolio';
import { WalletRoutes } from '../wallet';
import { SharesRoutes } from '../shares';
const httpStatus = require('http-status');

const createUser = async (req, res) => {
    //parametreler (user, shareID, type)
    try {
        if(!(req.body.shareID)){
            return res.status(httpStatus.HTTP_STATUS_BAD_REQUEST).json(errorHandling("Başlamadan önce alış ya da satış yapmalısınız."));
        }
        const type = req.body.type;
        if(type === "BUY"){
            await buyShare(req);
        }
        else if (type === "SELL"){
            await buyShare(req);
        }
        await create(req);
        return res.status(httpStatus.CREATED).send('Success');

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
}

const sellShare = async (req, res) => {
    //parametreler (userID, shareID)
    try {
        const userID = req.body.userID;
        const shareID = req.body.shareID;
        const share = await SharesRoutes.get(shareID);
        const usersShare = getUsersShare(userID);
        const shareStock = share.stock;
        const sharePrice = share.price;
        const usersMoney = await WalletRoutes.get(userID);
        const doesUserHave = usersShare.includes(shareID);
        if(doesUserHave){
            const portfolio = await PortfolioRoutes.post({
                shareID: this.shareID,
                userID: this.userID,
                type: 'SELL'
            });
            await SharesRoutes.patch(shareID, {
                stock: this.shareStock + 1
            });
            await WalletRoutes.patch( userID, {
                cash: usersMoney + sharePrice
            });
        }
        return res.status(httpStatus.CREATED).send('Success');

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
}

const getUsersBoughtShares = async (userID) =>{
    try {
        return await Model.portfolios.findAll({
            attributes: [
                'shareID',
                [sequelize.fn('COUNT', sequelize.col('shareID')), 'count']
            ],
            where: Sequelize.and(
                {userID: userID},
                {type: 'BUY'}
            ),
            group: 'shareID'

        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
}
const getUsersSoldShares = async (userID) =>{
    try {
        return await Model.portfolios.findAll({
            attributes: [
                'shareID',
                [sequelize.fn('COUNT', sequelize.col('shareID')), 'count']
            ],
            where: Sequelize.and(
                {userID: userID},
                {type: 'SELL'}
            ),
            group: 'shareID'

        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
}
const getUsersShare = async (req, res) => {
    try {
        let userID = req.body.userID;
        let boughtShares = await getUsersBoughtShares(userID);
        let soldShares = await getUsersSoldShares(userID);
        boughtShares.forEach(boughtElement => {
            soldShares.forEach(soldElement => {
                if(boughtElement.shareID == soldElement.shareID){
                    boughtElement.count = boughtElement.count - soldElement.count;
                }
                if(boughtElement.count == 0){
                    boughtShares.remove(boughtElement);
                }
            })
        });
        return boughtShares;

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
}

const buyShare = async (req, res) => {
    //parametreler (userID, shareID)
    try {
        const userID = req.body.userID;
        const shareID = req.body.shareID;
        const share = await SharesRoutes.get(shareID);
        const shareStock = share.stock;
        const sharePrice = share.price;
        const usersMoney = await WalletRoutes.get(userID);
        if(shareStock > 0 && sharePrice <= usersMoney){
            const portfolio = await PortfolioRoutes.post({
                shareID: this.shareID,
                userID: this.userID,
                type: 'BUY'
            });
            await SharesRoutes.patch(shareID, {
                stock: this.share.stock - 1
            });
            await WalletRoutes.patch( userID, {
                cash: usersMoney - sharePrice
            });
        }
        return res.status(httpStatus.CREATED).send('Success');

    } catch (error) {
        return res.status(httpStatus.BadRequest).json(errorHandling(error));
    }
}


//wallet ve user yaratılır
const create = async (req, res) => {
    try {
        const wallet = await WalletRoutes.post(req.body.wallet);
        const ob = await Model.user.create(req.body);
        return res.status(httpStatus.CREATED).send('Success');

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
}

//sadece user update
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await Model.user.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updated = await Model.user.findOne({ where: { id: id } });
            return res.status(httpStatus.OK).send('Success');
        }
    throw new Error('Not found');
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
};

//wallet ve user silinir
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Model.user.destroy({
            where: { id: id }
        });
        const walletDeleted = await WalletRoutes.delete(req.body.wallet);

        if (deleted && walletDeleted) {
            return res.status(httpStatus.NO_CONTENT).send('Success');
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorHandling(error));
    }
};

module.exports = {
    remove,
    update,
    buyShare,
    sellShare,
    createUser
};
