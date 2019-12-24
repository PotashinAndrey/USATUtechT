using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp2
{
    public class Node
    {
        private int value;
        private int x;
        private int y;

        public int X { get { return x; } }
        public int Y { get { return y; } }
        public int Value { get { return value; } }

        public Node(int value, int x, int y)
        {
            this.x = x;
            this.y = y;
            this.value = value;
        }
    }
}
