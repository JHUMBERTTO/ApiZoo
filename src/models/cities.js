import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Country } from './countries.js'

export const City = sequelize.define('cities', {
    id_city: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    city_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id_country'
      }
    }
  }, {
    sequelize,
    tableName: 'cities',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cities_pkey",
        unique: true,
        fields: [
          { name: "id_city" },
        ]
      },
    ]
  });

  City.hasOne(Country, {
    foreinKey:'id_country'
  })

  