using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp2
{
    class Node
    {
        private int value;
        private int x;
        private int y;

        public Node(int value, int x, int y)
        {
            this.x = x;
            this.y = y;
            this.value = value;
        }
    }
}
