using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp1
{
    public class Node
    {
        int x, y, value;
        public Node(int value, int x, int y)
        {
            this.x = x;
            this.y = y;
            this.value = value;
        }

        public int X { get => x; }
        public int Y { get => y; }
    }
}
