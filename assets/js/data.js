// ═══════════════════════════════════════════════════════════════════
// RIFT WEBSITE - DATA
// Language comparisons, examples, and content data
// ═══════════════════════════════════════════════════════════════════

window.comparisonData = [
  // Hello World Examples
  {
    language: 'RIFT',
    task: 'hello-world',
    code: `let name = "World"
print(\`Hello, \$@name#!\`)`,
    lines: 2,
    chars: 41
  },
  {
    language: 'Python',
    task: 'hello-world',
    code: `name = "World"
print(f"Hello, {name}!")`,
    lines: 2,
    chars: 42
  },
  {
    language: 'JavaScript',
    task: 'hello-world',
    code: `const name = "World";
console.log(\`Hello, \${name}!\`);`,
    lines: 2,
    chars: 51
  },
  {
    language: 'Java',
    task: 'hello-world',
    code: `public class Hello {
    public static void main(String[] args) {
        String name = "World";
        System.out.println("Hello, " + name + "!");
    }
}`,
    lines: 6,
    chars: 157
  },
  {
    language: 'C++',
    task: 'hello-world',
    code: `#include <iostream>
#include <string>

int main() {
    std::string name = "World";
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}`,
    lines: 8,
    chars: 158
  },
  {
    language: 'Go',
    task: 'hello-world',
    code: `package main

import "fmt"

func main() {
    name := "World"
    fmt.Printf("Hello, %s!\\n", name)
}`,
    lines: 7,
    chars: 102
  },
  {
    language: 'Rust',
    task: 'hello-world',
    code: `fn main() {
    let name = "World";
    println!("Hello, {}!", name);
}`,
    lines: 4,
    chars: 70
  },
  {
    language: 'PHP',
    task: 'hello-world',
    code: `<?php
$name = "World";
echo "Hello, $name!";
?>`,
    lines: 4,
    chars: 50
  },

  // HTTP Server Examples
  {
    language: 'RIFT',
    task: 'http-server',
    code: `grab http

http.get("/", conduit(req) @
    give http.html(200, "~h1!Welcome!~/h1!")
#)

http.serve(8080)`,
    lines: 7,
    chars: 113
  },
  {
    language: 'Python',
    task: 'http-server',
    code: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '<h1>Welcome!</h1>', 200

if __name__ == '__main__':
    app.run(port=8080)`,
    lines: 10,
    chars: 172
  },
  {
    language: 'JavaScript',
    task: 'http-server',
    code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome!</h1>');
});

app.listen(8080);`,
    lines: 8,
    chars: 157
  },
  {
    language: 'Go',
    task: 'http-server',
    code: `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(200)
    fmt.Fprintf(w, "<h1>Welcome!</h1>")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}`,
    lines: 16,
    chars: 285
  },
  {
    language: 'Java',
    task: 'http-server',
    code: `import com.sun.net.httpserver.*;
import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(
            new InetSocketAddress(8080), 0);
        
        server.createContext("/", (HttpExchange exchange) -> {
            String response = "<h1>Welcome!</h1>";
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        });
        
        server.start();
    }
}`,
    lines: 19,
    chars: 548
  },

  // Array Filtering Examples
  {
    language: 'RIFT',
    task: 'array-filter',
    code: `let numbers = ~1, 2, 3, 4, 5, 6!
let evens = numbers -! filter((n) =! n % 2 == 0)
print(evens)`,
    lines: 3,
    chars: 96
  },
  {
    language: 'Python',
    task: 'array-filter',
    code: `numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda n: n % 2 == 0, numbers))
print(evens)`,
    lines: 3,
    chars: 100
  },
  {
    language: 'JavaScript',
    task: 'array-filter',
    code: `const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);`,
    lines: 3,
    chars: 105
  },
  {
    language: 'Java',
    task: 'array-filter',
    code: `import java.util.*;
import java.util.stream.*;

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
System.out.println(evens);`,
    lines: 8,
    chars: 220
  },

  // Class Definition Examples
  {
    language: 'RIFT',
    task: 'class-definition',
    code: `make Person @
    build(name, age) @
        me.name = name
        me.age = age
    #
    
    conduit greet() @
        give \`Hello, I'm \$@me.name#!\`
    #
#`,
    lines: 10,
    chars: 158
  },
  {
    language: 'Python',
    task: 'class-definition',
    code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}!"`,
    lines: 7,
    chars: 158
  },
  {
    language: 'JavaScript',
    task: 'class-definition',
    code: `class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}!\`;
    }
}`,
    lines: 10,
    chars: 171
  },
  {
    language: 'Java',
    task: 'class-definition',
    code: `public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String greet() {
        return "Hello, I'm " + this.name + "!";
    }
}`,
    lines: 13,
    chars: 252
  },

  // Async/Await Examples
  {
    language: 'RIFT',
    task: 'async-fetch',
    code: `async conduit fetchUser(id) @
    let response = wait http.get(\`/api/users/\$@id#\`)
    give response.json()
#

let user = wait fetchUser(123)
print(user.name)`,
    lines: 7,
    chars: 143
  },
  {
    language: 'JavaScript',
    task: 'async-fetch',
    code: `async function fetchUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    return await response.json();
}

const user = await fetchUser(123);
console.log(user.name);`,
    lines: 7,
    chars: 171
  },
  {
    language: 'Python',
    task: 'async-fetch',
    code: `import aiohttp
import asyncio

async def fetch_user(id):
    async with aiohttp.ClientSession() as session:
        async with session.get(f'/api/users/{id}') as response:
            return await response.json()

user = asyncio.run(fetch_user(123))
print(user['name'])`,
    lines: 10,
    chars: 273
  },

  // Error Handling Examples
  {
    language: 'RIFT',
    task: 'error-handling',
    code: `try @
    let result = riskyOperation()
    print(result)
# catch error @
    print(\`Error: \$@error#\`)
# finally @
    cleanup()
#`,
    lines: 8,
    chars: 119
  },
  {
    language: 'JavaScript',
    task: 'error-handling',
    code: `try {
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    console.log(\`Error: \${error}\`);
} finally {
    cleanup();
}`,
    lines: 8,
    chars: 147
  },
  {
    language: 'Python',
    task: 'error-handling',
    code: `try:
    result = risky_operation()
    print(result)
except Exception as error:
    print(f"Error: {error}")
finally:
    cleanup()`,
    lines: 7,
    chars: 129
  },
  {
    language: 'Java',
    task: 'error-handling',
    code: `try {
    Object result = riskyOperation();
    System.out.println(result);
} catch (Exception error) {
    System.out.println("Error: " + error.getMessage());
} finally {
    cleanup();
}`,
    lines: 8,
    chars: 186
  },

  // Map/Transform Examples
  {
    language: 'RIFT',
    task: 'map-transform',
    code: `let numbers = ~1, 2, 3, 4, 5!
let doubled = numbers -! map((n) =! n * 2)
print(doubled)`,
    lines: 3,
    chars: 82
  },
  {
    language: 'JavaScript',
    task: 'map-transform',
    code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
    lines: 3,
    chars: 97
  },
  {
    language: 'Python',
    task: 'map-transform',
    code: `numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda n: n * 2, numbers))
print(doubled)`,
    lines: 3,
    chars: 91
  },

  // Database Query Examples
  {
    language: 'RIFT',
    task: 'database-query',
    code: `grab db

let conn = db.sql("sqlite:///app.db")
let users = conn.table("users")
    -> where("age", ">=", 18)
    -> order("name", "ASC")
    -> get()

print(users)`,
    lines: 9,
    chars: 157
  },
  {
    language: 'Python',
    task: 'database-query',
    code: `import sqlite3

conn = sqlite3.connect('app.db')
cursor = conn.cursor()

cursor.execute("""
    SELECT * FROM users 
    WHERE age >= 18 
    ORDER BY name ASC
""")

users = cursor.fetchall()
print(users)`,
    lines: 13,
    chars: 207
  },

  // Pattern Matching Examples
  {
    language: 'RIFT',
    task: 'pattern-matching',
    code: `let result = check value @
    0 =! "zero"
    1 =! "one"
    2 =! "two"
    _ =! "other"
#

print(result)`,
    lines: 8,
    chars: 103
  },
  {
    language: 'JavaScript',
    task: 'pattern-matching',
    code: `let result;
switch(value) {
    case 0: result = "zero"; break;
    case 1: result = "one"; break;
    case 2: result = "two"; break;
    default: result = "other";
}

console.log(result);`,
    lines: 9,
    chars: 180
  },
  {
    language: 'Python',
    task: 'pattern-matching',
    code: `match value:
    case 0: result = "zero"
    case 1: result = "one"
    case 2: result = "two"
    case _: result = "other"

print(result)`,
    lines: 7,
    chars: 127
  }
];

// Language metadata for filters
window.languages = [
  'RIFT', 'Python', 'JavaScript', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'C#'
];

window.tasks = [
  { id: 'hello-world', name: 'Hello World' },
  { id: 'http-server', name: 'HTTP Server' },
  { id: 'array-filter', name: 'Array Filtering' },
  { id: 'class-definition', name: 'Class Definition' },
  { id: 'async-fetch', name: 'Async/Await' },
  { id: 'error-handling', name: 'Error Handling' },
  { id: 'map-transform', name: 'Map/Transform' },
  { id: 'database-query', name: 'Database Query' },
  { id: 'pattern-matching', name: 'Pattern Matching' }
];
