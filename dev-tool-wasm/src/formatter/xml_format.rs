use wasm_bindgen::prelude::wasm_bindgen;

use quick_xml::events::Event;
use quick_xml::{Reader, Writer};

/// Prettify XML by adding proper new lines and indentation.
///
/// This uses the quick_xml library (https://github.com/tafia/quick-xml) to read/parse the given
/// XML string and then write it to a string as indented XML. This isn't perfect and most likely
/// not the most efficient.
///
/// One strange behavior is that a closing element tag is not put on a new line if it follows a
/// comment and text, for example:
/// ```
/// <tag2>
///   <!--Comment-->Text</tag2>
/// ```
///
/// Performance:
///   On a large 66K line minified XML document, this takes about 2700ms.
///   For small XMLs, the time is negligible.
#[wasm_bindgen]
pub fn xml_format(xml: &str) -> String {
    let mut buf = Vec::new();

    let mut reader = Reader::from_str(xml);
    reader.config_mut().trim_text(true);

    let mut writer = Writer::new_with_indent(Vec::new(), b' ', 2);

    loop {
        let ev = reader.read_event_into(&mut buf);

        match ev {
            Ok(Event::Eof) => break, // exits the loop when reaching end of file
            Ok(event) => writer.write_event(event),
            Err(e) => panic!("Error at position {}: {:?}", reader.buffer_position(), e),
        }
        .expect("Failed to parse XML");

        // If we don't keep a borrow elsewhere, we can clear the buffer to keep memory usage low
        buf.clear();
    }

    let result = std::str::from_utf8(&*writer.into_inner())
        .expect("Failed to convert a slice of bytes to a string slice")
        .to_string();

    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_xml_format() {
        assert_eq!(
            xml_format("<h1> <p> Hello</p> </h1><h1>World</h1>"),
            r"<h1>
  <p>Hello</p>
</h1>
<h1>World</h1>"
        );
    }
}
