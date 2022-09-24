const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    } 
});
    
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function getStocks() {    
    ApiConnector.getStocks(response => {        
        if (response.success) {
            ratesBoard.clearTable();            
            ratesBoard.fillTable(response.data);
        } 
   });
}
    
getStocks();
setInterval(getStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    if (response.success) {
        moneyManager.setMessage(true, 'Счет успешно пополнен');
        ProfileWidget.showProfile(response.data);
    } else {
        moneyManager.setMessage(false, response.error); 
    } 
});

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => {
    if (response.success) {
        moneyManager.setMessage(true, 'Конвертация прошла успешно');
        ProfileWidget.showProfile(response.data);
    } else {
        moneyManager.setMessage(false, response.error); 
    } 
});

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
    if (response.success) {
        moneyManager.setMessage(true, 'Перевод успешно выполнен');
        ProfileWidget.showProfile(response.data);
    } else {
        moneyManager.setMessage(false, response.error); 
    } 
});

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(true, 'Пользователь успешно добавлен');
    } else {
        favoritesWidget.setMessage(false, response.error); 
    } 
});

favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(true, 'Пользователь успешно удален');
    } else {
        favoritesWidget.setMessage(false, response.error); 
    } 
});