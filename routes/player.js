module.exports = {
 
    addPlayerPage: function (request, response) {
      
        response.render('edit-players', {add: true});
    },

    addPlayer: function (request, response) {
        
        let first_name = request.body.first_name;
        let last_name = request.body.last_name;
        let position = request.body.position;
        let number = request.body.number;

 
        let query = `INSERT INTO players (first_name, last_name, position, number)
            VALUES ('${first_name}', '${last_name}', '${position}', ${number});`;

        db.query(query, function (error, result) {
            if (error) {
              
                return response.status(500).send(error);
            }

            response.redirect('/');
        })
    },
    
    editPlayerPage: function (request, response) {
       
        let playerId = request.params.id;
    
        
        let query = `SELECT * FROM players WHERE id = ${playerId};`;
    
        
        db.query(query, function (error, result) {
            if (error) {
              
                return response.status(500).send(error);
            }
    
            console.log(result[0]);
    
            
            response.render('edit-players', {
                add: false,
                player: result[0]
            });
        });
    },
    editPlayer: function (request, response) {
        
        let playerId = request.params.id;
        let first_name = request.body.first_name;
        let last_name = request.body.last_name;
        let position = request.body.position;
        let number = request.body.number;
    
       
        let query = `UPDATE players
            SET first_name = '${first_name}', last_name = '${last_name}', position = '${position}', number = ${number}
            WHERE id = ${playerId};`;
    
        
        db.query(query, function (error, result) {
            if (error) {
                
                return response.status(500).send(error);
            }
    
            
            response.redirect('/');
        });
    },
    deletePlayer: function (request, response) {
       
        let playerId = request.params.id;
    
        let query = `DELETE FROM players WHERE id = ${playerId};`;
    
        db.query(query, function (error, result) {
            if (error) {
                
                return response.status(500).send(error);
            }
    
            
            response.redirect('/');
        });
    }
}