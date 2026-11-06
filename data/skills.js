TREES.skills = {
 "name": "Skills",
 "nodes": [
  {
   "id": "root",
   "name": "All Squad Attack",
   "size": "normal",
   "max": 2,
   "x": 123,
   "y": -51,
   "requires": [],
   "stat": "global_atk",
   "step": 0.75,
   "text": "Squad ATK +{v}%"
  },
  {
   "id": "def",
   "name": "All Squad Defense",
   "size": "normal",
   "max": 2,
   "x": 179,
   "y": -123,
   "requires": [
    "root"
   ],
   "stat": "global_def",
   "step": 0.75,
   "text": "Squad DEF +{v}%"
  },
  {
   "id": "howl",
   "name": "Howl of Fury",
   "size": "special",
   "max": 4,
   "x": 214,
   "y": -195,
   "requires": [
    "def"
   ],
   "stat": "rage_basic",
   "step": 2,
   "text": "Squads gain {v} Rage when using basic attacks."
  },
  {
   "id": "hp_top",
   "name": "All Squad HP",
   "size": "normal",
   "max": 2,
   "x": 281,
   "y": -266,
   "requires": [
    "howl"
   ],
   "stat": "global_hp",
   "step": 0.75,
   "text": "Squad HP +{v}%"
  },
  {
   "id": "rage",
   "name": "Raging Fire",
   "size": "special",
   "max": 5,
   "x": 398,
   "y": -245,
   "requires": [
    "hp_top"
   ],
   "stat": "rage_skill",
   "step": 12,
   "text": "Gain {v} Rage after using a skill."
  },
  {
   "id": "atk_top",
   "name": "All Squad ATK",
   "size": "normal",
   "max": 2,
   "x": 271,
   "y": -148,
   "requires": [
    "howl"
   ],
   "stat": "global_atk",
   "step": 0.75,
   "text": "Squad ATK +{v}%"
  },
  {
   "id": "double_edge",
   "name": "Double-Edged Sword",
   "size": "special",
   "max": 4,
   "x": 336,
   "y": -188,
   "requires": [
    "atk_top"
   ],
   "stat": [
    "skill_dmg_dealt",
    "skill_dmg_taken"
   ],
   "step": 1.5,
   "text": "Increases Squads' Skill DMG by {v}%, but Skill DMG taken increases by {v}%."
  },
  {
   "id": "spd",
   "name": "All Squad Speed",
   "size": "normal",
   "max": 3,
   "x": 210,
   "y": -29,
   "requires": [
    "root"
   ],
   "stat": "global_speed",
   "step": 3,
   "text": "Squad Travel Speed +{v}%"
  },
  {
   "id": "strat",
   "name": "Strategy Review",
   "size": "special",
   "max": 4,
   "x": 285,
   "y": -20,
   "requires": [
    "spd"
   ],
   "stat": "skill_dmg_passive",
   "step": 2,
   "text": "Skill DMG +{v}%"
  },
  {
   "id": "def_bot",
   "name": "All Squad Defense",
   "size": "normal",
   "max": 2,
   "x": 391,
   "y": -29,
   "requires": [
    "strat"
   ],
   "stat": "global_def",
   "step": 0.75,
   "text": "Squad DEF +{v}%"
  },
  {
   "id": "metal",
   "name": "Metal Guard",
   "size": "special",
   "max": 4,
   "x": 478,
   "y": -79,
   "requires": [
    "def_bot"
   ],
   "stat": "dmg_reduction",
   "step": 1.5,
   "text": "Reduces Squads' DMG taken by {v}%"
  },
  {
   "id": "hp_bot",
   "name": "All Squad HP",
   "size": "normal",
   "max": 2,
   "x": 339,
   "y": -94,
   "requires": [
    "strat"
   ],
   "stat": "global_hp",
   "step": 0.75,
   "text": "Squad HP +{v}%"
  },
  {
   "id": "skillful",
   "name": "Skillful Firepower",
   "size": "special",
   "max": 5,
   "x": 423,
   "y": -142,
   "requires": [
    "hp_bot"
   ],
   "stat": "skill_dmg_temp",
   "step": 1.5,
   "text": "Increases Skill DMG by {v}% for 6s after using a skill."
  },
  {
   "id": "predator",
   "name": "Predator's Rage",
   "size": "final",
   "max": 6,
   "x": 544,
   "y": -210,
   "requires": [
    "skillful",
    "metal",
    "rage"
   ],
   "stat": "rage_chance",
   "step": 20,
   "text": "Squads have 10% chance to gain {v} Rage when using basic attacks."
  }
 ]
};
