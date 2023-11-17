//! This file has been auto-generated, please do not modify manually
//! To regenerate this file re-run `cargo xtask generate tests` from the project root

use tempdir::TempDir;
use xshell::{cmd, Shell};

#[test]
fn preview2_tcp_sample_application() -> anyhow::Result<()> {
    let sh = Shell::new()?;
    let file_name = "preview2_tcp_sample_application";
    let tempdir = TempDir::new("{file_name}")?;
    let wasi_file = test_utils::compile(&sh, &tempdir, &file_name)?;
    cmd!(sh, "./src/jco.js run  --jco-import ./tests/virtualenvs/base.js {wasi_file} hello this '' 'is an argument' 'with 🚩 emoji'")
        .run()?;
    Ok(())
}
