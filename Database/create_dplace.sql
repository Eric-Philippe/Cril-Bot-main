CREATE TABLE canvas_data (
    id SERIAL PRIMARY KEY,
    canvas_json JSON,  -- The JSON column for canvas data
    width INTEGER,      -- Width of the canvas
    height INTEGER,     -- Height of the canvas
    created_at TIMESTAMP DEFAULT NOW() -- Creation timestamp
);

CREATE TABLE logs_canvas (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100),   -- Use appropriate data type for the user ID
    action_date TIMESTAMP,  -- Date and time of the action
    color VARCHAR(50),      -- Use appropriate data type for color representation
    x INTEGER,              -- x-coordinate of the pixel placement
    y INTEGER               -- y-coordinate of the pixel placement
);
