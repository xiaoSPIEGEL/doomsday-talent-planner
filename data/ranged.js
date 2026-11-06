TREES.ranged = {
 "name": "Ranged Squad",
 "nodes": [
  {
   "id": "root",
   "name": "Ranged Attack",
   "size": "normal",
   "max": 2,
   "x": 0,
   "y": -120,
   "requires": [],
   "stat": "ranged_atk",
   "step": 1.5,
   "text": "Ranged Squad ATK +{v}%"
  },
  {
   "id": "def_1",
   "name": "Ranged Defense",
   "size": "normal",
   "max": 2,
   "x": -72,
   "y": -192,
   "requires": [
    "root"
   ],
   "stat": "ranged_def",
   "step": 1.5,
   "text": "Ranged Squad DEF +{v}%"
  },
  {
   "id": "hp",
   "name": "Ranged HP",
   "size": "normal",
   "max": 2,
   "x": 0,
   "y": -213,
   "requires": [
    "root"
   ],
   "stat": "ranged_hp",
   "step": 1.5,
   "text": "Ranged Squad HP +{v}%"
  },
  {
   "id": "spd_1",
   "name": "Ranged Speed",
   "size": "normal",
   "max": 2,
   "x": 69,
   "y": -186,
   "requires": [
    "root"
   ],
   "stat": "ranged_speed",
   "step": 3,
   "text": "Ranged Squad Travel Speed +{v}%"
  },
  {
   "id": "armor_breaking",
   "name": "Armor-Breaking Bullets",
   "size": "special",
   "max": 4,
   "x": -118,
   "y": -251,
   "requires": [
    "def_1"
   ],
   "stat": "ranged_atk",
   "step": 1.5,
   "text": "Ranged Squad ATK +{v}%"
  },
  {
   "id": "brave_counter",
   "name": "Brave Counter",
   "size": "special",
   "max": 4,
   "x": 119,
   "y": -246,
   "requires": [
    "spd_1"
   ],
   "stat": "hp_below_50_atk",
   "step": 2.5,
   "text": "Increases Squad ATK by {v}% when remaining Squad Size < 50%."
  },
  {
   "id": "precise_strike",
   "name": "Precise Strike",
   "size": "special",
   "max": 4,
   "x": -46,
   "y": -328,
   "requires": [
    "hp",
    "def_1"
   ],
   "stat": "dmg_to_infantry",
   "step": 2,
   "text": "Increases Ranged Squads' DMG dealt to Infantry by {v}%"
  },
  {
   "id": "battle_craze",
   "name": "Battle Craze",
   "size": "special",
   "max": 4,
   "x": 50,
   "y": -324,
   "requires": [
    "spd_1",
    "hp"
   ],
   "stat": "rage_basic",
   "step": 2,
   "text": "Gain {v} additional Rage when using basic attacks."
  },
  {
   "id": "atk_2",
   "name": "Ranged Attack",
   "size": "normal",
   "max": 3,
   "x": -2,
   "y": -388,
   "requires": [
    "precise_strike",
    "battle_craze"
   ],
   "stat": "ranged_atk",
   "step": 1.5,
   "text": "Ranged Squad ATK +{v}%"
  },
  {
   "id": "spd_2",
   "name": "Ranged Speed",
   "size": "normal",
   "max": 3,
   "x": -67,
   "y": -416,
   "requires": [
    "atk_2"
   ],
   "stat": "ranged_speed",
   "step": 3,
   "text": "Ranged Squad Travel Speed +{v}%"
  },
  {
   "id": "def_2",
   "name": "Ranged Defense",
   "size": "normal",
   "max": 3,
   "x": 63,
   "y": -420,
   "requires": [
    "atk_2"
   ],
   "stat": "ranged_def",
   "step": 1.5,
   "text": "Ranged Squad DEF +{v}%"
  },
  {
   "id": "high_precision",
   "name": "High Precision Blast",
   "size": "special",
   "max": 5,
   "x": -93,
   "y": -480,
   "requires": [
    "spd_2"
   ],
   "stat": "skill_dmg_dealt",
   "step": 1.5,
   "text": "Skill DMG dealt +{v}%"
  },
  {
   "id": "secondary_weapon",
   "name": "Secondary Weapon",
   "size": "special",
   "max": 5,
   "x": 86,
   "y": -480,
   "requires": [
    "def_2"
   ],
   "stat": "extra_attack",
   "step": 200,
   "text": "10% chance to trigger an additional attack (Damage Factor: {v})."
  },
  {
   "id": "targeted_shot",
   "name": "Targeted Shot",
   "size": "final",
   "max": 6,
   "x": -3,
   "y": -551,
   "requires": [
    "secondary_weapon",
    "high_precision"
   ],
   "stat": "chance_atk_buff",
   "step": 4,
   "text": "10% chance to increase ATK by {v}% for 2s when using basic attacks."
  }
 ]
};
