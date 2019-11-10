using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp2 
{
    class MyModel : IModel
    {
        public int Count { get { return nodes.Count; } }

        static Random r = new Random();
        public void AddNode(int value)
        {
            nodes.AddFirst(new Node(value, r.Next(10), r.Next(10)));
        }

        LinkedList<Node> nodes = new LinkedList<Node>();
        public void RemoveLastNode()
        {
            nodes.RemoveLast();
        }
    }
}
