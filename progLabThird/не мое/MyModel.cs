using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prog_lab3
{
     class MyModel : IModel
    {
        LinkedList<Node> nodes = new LinkedList<Node>();
        public int Count => nodes.Count;

        public event Action Changed;
        public IEnumerable<Node> AllNodes => nodes;

        static Random r = new Random();
        public void AddNode(int value)
        {
            if (Changed != null) Changed();
            nodes.AddFirst(new Node(value, r.Next(10), r.Next(10)));

        }


        public void RemoveLastNode()
        {
            if (Changed != null) Changed();
            if (nodes.Count >0)nodes.RemoveLast();

        }
    }
}
