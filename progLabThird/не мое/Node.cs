using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prog_lab3
{
    class Node
    {
        int value;
        int x;
        int y;
        bool clicked = false;
        public Node(int v, int a, int b)
        {
            value = v;
            x = a;
            y = b;
        }

        public int X { get { return x; } }
        public bool Clicked { get; set; }
        public int Y { get { return y; } }
    }
}
