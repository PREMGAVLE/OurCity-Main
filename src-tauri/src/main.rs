#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result as SqlResult};
use simflo_db_lib::template::insert::{insert_template,list_templates,get_templates_all,list_templates_by_id,get_modules_without_json_config};
use simflo_db_lib::template::model::{NewErpTemplate,ErpTemplate};


use std::fs::{self, File};
use std::io::Write;
use std::path::Path;
use tauri_plugin_fs;
#[tauri::command]
fn verify_otp(otp: String, mobile: String, code: String) -> bool {
    use rust_app_bl::Phone;
    println!("verify_otp called with otp: {}, mobile: {}, code: {}", otp, mobile, code);

    let phone = Phone::new(
        mobile.to_string(),
        code.to_string(),
        Some(otp),
    );

    println!("Phone created for verification.");

    match phone.verify_otp() {
        Ok(msg) => {
            println!("OTP Verified: {}", msg);
            true
        },
        Err(err) => {
            println!("OTP Error: {}", err);
            false
        }
    }
}


#[tauri::command]
fn register(phone: String, code: String) -> bool {
    use rust_app_bl::Phone;

    println!("register called with phone: {}, code: {}", phone, code);

    let phone = Phone::new(
        phone.to_string(),
        code.to_string(),
        None, // No OTP yet
    );

    println!("Phone created for registration.");

    let msg = phone.register();
    println!("OTP has been sent to: {}", msg);

    true
}
#[tauri::command]
fn open_manual_db() -> Result<Vec<(i32, String, String)>, String> {
    println!("open_manual_db called.");
    let conn = Connection::open("my_local.db").map_err(|e| format!("DB open error: {}", e))?;
    println!("Database connection established.");
    let mut stmt = conn
        .prepare("SELECT id, name, email FROM users")
        .map_err(|e| format!("Prepare failed: {}", e))?;
    println!("Statement prepared.");
    let user_iter = stmt
        .query_map([], |row| {
            Ok((
                row.get::<_, i32>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, String>(2)?,
            ))
        })
        .map_err(|e| format!("Query failed: {}", e))?;

    let mut results = vec![];
    for user in user_iter {
        results.push(user.map_err(|e| format!("Row error: {}", e))?);
    }

    println!("Result fetched: {:?}", results);
    Ok(results)
}
#[tauri::command]
fn insert_template_command(args: NewErpTemplate) -> Result<(), String> {
    println!("insert_template_command called with args: {:?}", args);
    let result = insert_template(args);
    match result {
        Ok(_) => println!("Template inserted successfully."),
        Err(ref e) => println!("Error inserting template: {}", e),
    }
    result
}
#[tauri::command]
fn fetch_templates() -> Result<Vec<ErpTemplate>, String> {
    get_templates_all()
}

#[tauri::command]
fn fetch_all_modules() -> Result<Vec<String>, String> {
    simflo_db_lib::template::insert::get_all_modules()
}

#[tauri::command]
fn fetch_templates_data_by_id(template_id: String) -> Result<Vec<ErpTemplate>, String> {
    list_templates_by_id(template_id)
}

#[tauri::command]
fn fetch_modules_without_config() -> Result<Vec<simflo_db_lib::template::insert::ErpTemplateWithoutConfig>, String> {
   get_modules_without_json_config()
}
#[tauri::command]
fn fetch_templates_by_module(module: String) -> Result<Vec<ErpTemplate>, String> {
    simflo_db_lib::template::insert::get_templates_by_module(module)
}
#[tauri::command]
fn save_selfie(filename: String, base64_data: String) -> Result<(), String> {
    // Create selfies directory if it doesn't exist
    let path = Path::new("selfies");
    if !path.exists() {
        fs::create_dir_all(path).map_err(|e| format!("Failed to create directory: {}", e))?;
    }

    // Decode the base64 and save to file
    let decoded = base64::decode(base64_data).map_err(|e| format!("Base64 decode error: {}", e))?;
    let filepath = path.join(filename);
    let mut file = File::create(&filepath).map_err(|e| format!("File creation error: {}", e))?;
    file.write_all(&decoded).map_err(|e| format!("Write error: {}", e))?;

    println!("Saved selfie to: {:?}", filepath);
    Ok(())
}
#[tauri::command]
fn update_template_command(template_id_val: String, updated_template: NewErpTemplate) -> Result<(), String> {
    println!("Called update_template_command");
    println!("Template ID: {}", template_id_val);
    println!("Updated Template: {:?}", updated_template);

    simflo_db_lib::template::insert::update_template(template_id_val, updated_template)
}


#[tauri::command]
fn delete_template_command(template_id_val: String) -> Result<(), String> {
    simflo_db_lib::template::insert::delete_template(template_id_val)
}

#[tauri::command]
fn fetch_templates_by_resource(resource: String) -> Result<Vec<ErpTemplate>, String> {
    simflo_db_lib::template::insert::get_templates_by_resource(resource)
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            insert_template_command,
            fetch_templates,
            fetch_all_modules,
            fetch_templates_data_by_id,
            fetch_modules_without_config,
            fetch_templates_by_module,
            fetch_templates_by_resource,
            verify_otp,
            register,
            open_manual_db,
            save_selfie,
            update_template_command,
            delete_template_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}