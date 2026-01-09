import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { convertSectionsToMenuData } from '../../../../lib/menu-data-converter';

export async function POST(request) {
  try {
    const { menuData } = await request.json();

    if (!menuData || !menuData.sections) {
      return NextResponse.json(
        { error: 'Invalid menu data provided' },
        { status: 400 }
      );
    }

    // Convert sections format back to newMenuData format
    const convertedData = convertSectionsToMenuData(menuData.sections);

    // Read the existing menu-data.js file
    const filePath = path.join(process.cwd(), 'lib', 'menu-data.js');
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Find the newMenuData export and replace it
    const startMarker = 'export const newMenuData =';

    const startIndex = fileContent.indexOf(startMarker);
    if (startIndex === -1) {
      return NextResponse.json(
        { error: 'Could not find newMenuData export in file' },
        { status: 500 }
      );
    }

    // Find the closing brace of newMenuData object (matching braces)
    let braceCount = 0;
    let foundFirstBrace = false;
    let endIndex = startIndex;

    for (let i = startIndex + startMarker.length; i < fileContent.length; i++) {
      const char = fileContent[i];
      // Skip whitespace before first brace
      if (!foundFirstBrace && (char === ' ' || char === '\n' || char === '\t' || char === '\r')) {
        continue;
      }
      if (char === '{') {
        braceCount++;
        foundFirstBrace = true;
      } else if (char === '}') {
        braceCount--;
        if (foundFirstBrace && braceCount === 0) {
          endIndex = i + 1;
          break;
        }
      }
    }

    if (endIndex === startIndex) {
      return NextResponse.json(
        { error: 'Could not find end of newMenuData object' },
        { status: 500 }
      );
    }

    // Format the new data as JavaScript object with proper indentation
    const formattedData = formatMenuDataAsJS(convertedData);

    // Replace the old data with new data (preserve everything before and after)
    const beforeData = fileContent.substring(0, startIndex + startMarker.length);
    const afterData = fileContent.substring(endIndex);
    // Match the original formatting style: 'export const newMenuData = { ... }'
    const newFileContent = beforeData + ' ' + formattedData + afterData;

    // Write the updated file
    fs.writeFileSync(filePath, newFileContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Menu data updated successfully'
    });
  } catch (error) {
    console.error('Error updating menu data:', error);
    return NextResponse.json(
      { error: 'Failed to update menu data: ' + error.message },
      { status: 500 }
    );
  }
}

// Helper function to format menu data as JavaScript object string
function formatMenuDataAsJS(obj, indent = 2) {
  const spaces = ' '.repeat(indent);
  let result = '';

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    result = '[\n';
    obj.forEach((item, index) => {
      result += spaces + '  ';
      result += formatMenuDataAsJS(item, indent + 2);
      if (index < obj.length - 1) result += ',';
      result += '\n';
    });
    result += spaces + ']';
    return result;
  }

  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    result = '{\n';
    keys.forEach((key, index) => {
      result += spaces + '  ' + key + ': ';
      result += formatMenuDataAsJS(obj[key], indent + 2);
      if (index < keys.length - 1) result += ',';
      result += '\n';
    });
    result += spaces + '}';
    return result;
  }

  if (typeof obj === 'string') {
    // Escape special characters in strings
    const escaped = obj
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
    return `"${escaped}"`;
  }

  if (obj === null) return 'null';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'boolean') return String(obj);
  return String(obj);
}
