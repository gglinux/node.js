var BaseMongodb = require('./base_mongodb')  , baseMongodb = new BaseMongodb()  , rowInfo = {}  , rowInfoNextOne = {}  , rowInfoNextTwo = {}  , rowInfoNextThree = {}  , tableName = 'node_book';rowInfo.book_name = 'nodejs book';rowInfo.author = 'gglinux';/*数据插入验证 */rowInfo.book_name = 'nodejs book1';baseMongodb.insert(tableName, rowInfo, function(ret){	console.log(ret);});rowInfoNextOne.book_name = 'nodejs book2';rowInfoNextOne.author = 'gglinux';baseMongodb.insert(tableName, rowInfoNextOne, function(ret){	console.log(ret);});rowInfoNextTwo.book_name = 'nodejs book3';rowInfoNextTwo.author = 'gglinux';baseMongodb.insert(tableName, rowInfoNextTwo, function(ret){	console.log(ret);});rowInfoNextThree.book_name = 'nodejs book34';rowInfoNextThree.author = 'gglinux';baseMongodb.insert(tableName, rowInfoNextThree, function(ret){	console.log(ret);});/* findOneById验证 */var id ='50db1e69d923dbfe06000001';baseMongodb.findOneById(tableName, id, function(ret){	console.log(ret);});/* modify验证 */var newInfo = {};newInfo.book_name = 'nodejs book-by gglinux';newInfo.author = 'Jimi';var id = '50db1e69d923dbfe06000001';baseMongodb.modify(tableName, id, newInfo, function(ret){	console.log(ret);});/* remove验证 */var id = '50db1e69d923dbfe06000001';baseMongodb.remove(tableName, id, function(ret){	console.log(ret);});/* find验证 */var whereJson = {'author':'gglinux'};var fieldsJson = {'book_name':1, 'author':1};var orderByJson = {'book_name':1};var limitJson = {'num':10};baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, function(ret){	console.log(ret);});